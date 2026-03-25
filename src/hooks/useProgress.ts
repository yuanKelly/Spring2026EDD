import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { UserProgress, UnitProgress } from '../types';
import { useAuth } from '../contexts/AuthContext';

const defaultUnitProgress = (unitId: string, locked: boolean): UnitProgress => ({
  unitId,
  status: locked ? 'locked' : 'not-started',
  timesCompleted: 0,
});

const defaultProgress = (uid: string): UserProgress => ({
  uid,
  units: {
    'unit-1': defaultUnitProgress('unit-1', false),
    'unit-2': defaultUnitProgress('unit-2', false),
    'unit-3': defaultUnitProgress('unit-3', false),
    'unit-4': defaultUnitProgress('unit-4', false),
    'unit-5': defaultUnitProgress('unit-5', false),
    'unit-6': defaultUnitProgress('unit-6', true),
  },
  lastSessionDate: new Date(),
});

export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProgress(null);
      setLoading(false);
      return;
    }

    const load = async () => {
      const ref = doc(db, 'progress', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProgress(snap.data() as UserProgress);
      } else {
        const def = defaultProgress(user.uid);
        await setDoc(ref, def);
        setProgress(def);
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const completeUnit = useCallback(
    async (unitId: string) => {
      if (!user || !progress) return;

      const updated = { ...progress };
      updated.units[unitId] = {
        ...updated.units[unitId],
        status: 'completed',
        timesCompleted: (updated.units[unitId].timesCompleted || 0) + 1,
        lastCompletedAt: new Date(),
      };
      updated.lastSessionDate = new Date();

      // Check if unit 6 should be unlocked
      const units1to5 = ['unit-1', 'unit-2', 'unit-3', 'unit-4', 'unit-5'];
      const allDone = units1to5.every((id) => updated.units[id].status === 'completed');
      if (allDone && updated.units['unit-6'].status === 'locked') {
        updated.units['unit-6'].status = 'not-started';
      }

      await setDoc(doc(db, 'progress', user.uid), updated);
      setProgress(updated);
    },
    [user, progress]
  );

  const startUnit = useCallback(
    async (unitId: string) => {
      if (!user || !progress) return;
      const updated = { ...progress };
      if (updated.units[unitId].status === 'not-started') {
        updated.units[unitId].status = 'in-progress';
        await setDoc(doc(db, 'progress', user.uid), updated);
        setProgress(updated);
      }
    },
    [user, progress]
  );

  return { progress, loading, completeUnit, startUnit };
}
