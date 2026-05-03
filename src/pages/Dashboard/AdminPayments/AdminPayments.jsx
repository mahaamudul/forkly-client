import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TableLoadingRow } from "../../../components/Loading/LoadingState";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminPayments = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: payments = [], isPending } = useQuery({
    queryKey: ["admin-payments", search],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments", {
        params: search ? { search } : {},
      });
      return res.data;
    },
  });

  const totals = useMemo(() => {
    const revenue = payments.reduce(
      (sum, payment) => sum + Number(payment.price || 0),
      0
    );

    return {
      transactions: payments.length,
      revenue,
    };
  }, [payments]);

  return (
    <div className="space-y-8">
      <SectionTitle heading="Payment Console" subHeading="Track every transaction" />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-orange-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Transactions
          </p>
          <p className="mt-3 text-4xl font-bold text-neutral">{totals.transactions}</p>
        </div>
        <div className="rounded-lg border border-orange-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Revenue
          </p>
          <p className="mt-3 text-4xl font-bold text-neutral">
            ${totals.revenue.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-orange-200 bg-base-100 p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral">All payments</h2>
            <p className="text-sm text-slate-500">
              Search by guest email or transaction id.
            </p>
          </div>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="input input-bordered w-full md:max-w-sm"
            placeholder="Search payment records"
          />
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Guest</th>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                <TableLoadingRow colSpan={5} label="Loading payments" />
              ) : payments.length ? (
                payments.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td className="font-medium text-neutral">{payment.email}</td>
                    <td className="max-w-[260px] truncate text-slate-600">
                      {payment.transactionId}
                    </td>
                    <td>${Number(payment.price || 0).toFixed(2)}</td>
                    <td>
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase text-neutral">
                        {payment.status || "paid"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-slate-500">
                    No payment records matched your search.
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

export default AdminPayments;
