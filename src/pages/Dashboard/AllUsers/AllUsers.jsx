import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdOutlineDeleteForever } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [],refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDeleteUser=(user)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/users/${user._id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch()
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
            }
          });
        }
      });

  }

  const handleMakeAdmin=(user)=>{
    axiosSecure.patch(`/users/admin/${user._id}`)
    .then(res=>{
        if(res.data.modifiedCount>0){
            Swal.fire(`${user.name} is admin now`);
            refetch()
        }
    })

  }
  return (
    <div>
      <div className="flex justify-evenly items-center mb-8">
        <h1 className="text-3xl font-semibold ">All Users {users.length}</h1>
        <h1 className="text-4xl font-semibold">Total</h1>
        {/* <button className="btn bg-orange-300 text-black">btn</button> */}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Roll</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    {user.role==='admin'? "Admin": <button
                    onClick={() => handleMakeAdmin(user)}
                    className="btn btn-square btn-outline"
                  >
                    <span className="text-orange-500 text-2xl "><LuUsers/></span>
                  </button>}
                </td>
                <td>
                  
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-square btn-outline"
                  >
                    <span className="text-neutral text-3xl "><MdOutlineDeleteForever /></span>
                  </button>
                </td>
              </tr>
            ))}

            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
