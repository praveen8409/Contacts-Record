
import { create } from "zustand";
import toast from "react-hot-toast";

const useDatabaseData = create((set) => ({
  loading: false,
  records: [],
  error: null,
  fetchDatabaseData: async (database) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`/api/records/${database}`);
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      set({ records: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  sortRecords: async (database, field) => {
    try {
      const res = await fetch(`/api/records/${database}/sort/${field}/asc`);
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      set({ records: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  searchRecords: async (database, query) => {
    try {
      const res = await fetch(`/api/records/${database}/search/${query}`);
      const data = await res.json();
      if (data.length === 0) {
        console.log(data.length);
        toast.error("No records found")
      } else {
        if (data.error) {
          throw new Error(data.error);
        }

        set({ records: data, loading: false });
      }



    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  addRecord: async (database, recordData) => {
    set((state) => ({ ...state, loading: true, error: null }));

    try {
      const res = await fetch(`/api/records/${database}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recordData),
      });

      const data = await res.json();
      console.log(data);
      if(res.status == 400){
        toast.error("Phone No. already exits.");
        set((state) => ({loading: false }));
        return;
      }
      if (data.error) {
        throw new Error(data.error);
      }

      set((state) => ({ records: [...state.records, data], loading: false }));
      toast.success("Record added successfully");
    } catch (error) {
      set((state) => ({ error: error.message, loading: false }));
    }
  },
  deleteRecord: async (database, recordId) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`/api/records/${database}/${recordId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      set((state) => ({
        records: state.records.filter((record) => record._id !== recordId),
        loading: false,
      }));

      toast.success("Record deleted successfully");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Error deleting record");
    }
  }
}));

export default useDatabaseData;




