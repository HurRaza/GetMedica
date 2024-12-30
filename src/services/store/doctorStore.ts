import { create } from "zustand";

interface DoctorStore {
    doctors: any|null;
    filteredDoctors:any 
    setDoctors: (doctors: any) => void;
    setFilteredDoctors: (filteredDoctors: any) => void;
}
  
export const useDoctorsStore = create<DoctorStore>(set => ({
    doctors: [],
    filteredDoctors: [],
    setDoctors: doctors => set({doctors}),
    setFilteredDoctors: filteredDoctors => set({filteredDoctors}),
}));