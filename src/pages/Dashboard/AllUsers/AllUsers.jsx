import { useContext, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineDeleteForever, MdOutlinePersonSearch } from "react-icons/md";
import { LuShieldCheck, LuUsers } from "react-icons/lu";
import Swal from "sweetalert2";
import AdminEmptyState from "../../../components/Admin/AdminEmptyState";
import AdminMetricCard from "../../../components/Admin/AdminMetricCard";
import AdminPageHeader from "../../../components/Admin/AdminPageHeader";
import { TableLoadingRow } from "../../../components/Loading/LoadingState";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AUthContext } from "../../../provider/AuthProvider";

const roleOptions = ["all", "admin", "customer"];

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useContext(AUthContext);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const { data: users = [], refetch, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const stats = useMemo(() => {
    const admins = users.filter((user) => user.role === "admin").length;
    return {
      total: users.length,
      admins,
      customers: users.length - admins,
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return users.filter((user) => {
      const role = user.role || "customer";
      const matchesRole = roleFilter === "all" || role === roleFilter;
      const matchesSearch =
        !searchValue ||
        user.name?.toLowerCase().includes(searchValue) ||
        user.email?.toLowerCase().includes(searchValue);

      return matchesRole && matchesSearch;
    });
  }, [roleFilter, search, users]);

  const handleDeleteUser = (selectedUser) => {
    if (selectedUser.email === currentUser?.email) {
      Swal.fire({
        icon: "info",
        title: "Current admin",
        text: "You cannot remove the account you are currently using.",
      });
      return;
    }

    Swal.fire({
      title: "Remove this user?",
      text: `${selectedUser.email} will lose access to stored Forkly data.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove user",
    }).then((result) => {
      if (!result.isConfirmed) return;

      axiosSecure.delete(`/users/${selectedUser._id}`).then((res) => {
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "User removed",
            text: `${selectedUser.email} has been deleted.`,
            icon: "success",
          });
        }
      });
    });
  };

  const handleMakeAdmin = (selectedUser) => {
    axiosSecure.patch(`/users/admin/${selectedUser._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Admin access granted",
          text: `${selectedUser.name || selectedUser.email} can now manage Forkly.`,
          icon: "success",
        });
        refetch();
      }
    });
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="User administration"
        title="All Users"
        description="Review customer accounts, find staff quickly, and grant admin access with clearer controls."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <AdminMetricCard label="Total Users" value={stats.total} icon={<LuUsers />} />
        <AdminMetricCard label="Admins" value={stats.admins} icon={<LuShieldCheck />} />
        <AdminMetricCard label="Customers" value={stats.customers} icon={<LuUsers />} />
      </div>

      <div className="rounded-lg border border-orange-200 bg-base-100 p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral">Account directory</h2>
            <p className="text-sm text-slate-500">
              Showing {filteredUsers.length} of {users.length} users.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_180px] lg:w-[560px]">
            <label className="input input-bordered flex items-center gap-2">
              <MdOutlinePersonSearch className="text-xl text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="grow"
                placeholder="Search name or email"
              />
            </label>
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="select select-bordered w-full"
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role === "all" ? "All roles" : role}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Role</th>
                <th>Joined</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                <TableLoadingRow colSpan={5} label="Loading users" />
              ) : filteredUsers.length ? (
                filteredUsers.map((selectedUser, index) => {
                  const role = selectedUser.role || "customer";
                  const isCurrentUser = selectedUser.email === currentUser?.email;
                  const createdAt = selectedUser.createdAt
                    ? new Date(selectedUser.createdAt).toLocaleDateString()
                    : "Not tracked";

                  return (
                    <tr key={selectedUser._id}>
                      <td>{index + 1}</td>
                      <td>
                        <p className="font-semibold text-neutral">
                          {selectedUser.name || "Forkly Guest"}
                          {isCurrentUser ? (
                            <span className="ml-2 text-xs font-medium text-orange-500">
                              You
                            </span>
                          ) : null}
                        </p>
                        <p className="text-sm text-slate-500">{selectedUser.email}</p>
                      </td>
                      <td>
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase text-neutral">
                          {role}
                        </span>
                      </td>
                      <td className="text-slate-600">{createdAt}</td>
                      <td>
                        <div className="flex justify-end gap-2">
                          {role === "admin" ? (
                            <button className="btn btn-sm btn-disabled" disabled>
                              <LuShieldCheck />
                              Admin
                            </button>
                          ) : (
                            <button
                              onClick={() => handleMakeAdmin(selectedUser)}
                              className="btn btn-sm border-0 bg-orange-400 text-neutral hover:bg-orange-500"
                            >
                              <LuShieldCheck />
                              Make Admin
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteUser(selectedUser)}
                            className="btn btn-sm border border-orange-200 bg-white text-neutral hover:bg-orange-50"
                            disabled={isCurrentUser}
                          >
                            <MdOutlineDeleteForever className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="py-6">
                    <AdminEmptyState
                      title="No users found"
                      description="Try clearing the search or changing the role filter."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
