import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AUthContext } from "../../../provider/AuthProvider";
import { TableLoadingRow } from "../../../components/Loading/LoadingState";

const PaymentHistory = () => {
    const { user } = useContext(AUthContext)
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isPending } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-6">Total Payments: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>price</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isPending ? (
                            <TableLoadingRow colSpan={4} label="Loading payments" />
                        ) : payments.length ? (
                            payments.map((payment, index) => <tr key={payment._id}>
                            <th>{index + 1}</th>
                            <td>${payment.price}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.status}</td>
                        </tr>)
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-8 text-center text-slate-500">
                                    No payments found.
                                </td>
                            </tr>
                        )}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
