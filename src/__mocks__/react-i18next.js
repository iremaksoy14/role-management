module.exports = {
  useTranslation: () => ({
    t: (key, opts) => {
      if (key === "confirm.descDelete") {
        return `“${opts?.name}”`;
      }
      const last = String(key).split(".").pop() || String(key);
      const dict = {
        users: "User list",
        nameLabel: "Full Name",
        role: "Role",
        permissions: "Permissions",
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        titleDelete: "Delete user",
        loading: "Loading…",
        empty: "No records",
      };
      return dict[last] ?? last;
    },
  }),
};
