"use client";
import { getUser } from "lib/auth";

const BillingDetail = ({ form, setForm }) => {
  const user = getUser();
  return (
    <>
      <div className="col-span-1">
        <h1 className="text-3xl font-medium pb-5">Billing Details</h1>
        <div className="grid grid-cols-2 gap-4 p-10 bg-white border border-gray-300">
          <div className="flex flex-col">
            <label>
              FirstName <span className="text-red-500">*</span>
            </label>
            <input
              className="border rounded-[10px] p-3 w-full border-gray-400 bg-gray-200"
              value={user.givenName}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label>
              LastName <span className="text-red-500">*</span>
            </label>
            <input
              className="border rounded-[10px] p-3 w-full border-gray-400 bg-gray-200"
              value={user.familyName}
              readOnly
            />
          </div>

          <div className="col-span-2 flex flex-col my-5">
            <label>
              Address <span className="text-red-500">*</span>
            </label>
            <select
              className="border rounded-[10px] p-3 w-full border-gray-400"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            >
              <option value="">Chọn địa chỉ</option>
              {user.address.map((addr) => (
                <option key={addr._id} value={addr._id}>
                  {addr.street},{addr.ward},{addr.district} {addr.city},
                  {addr.country}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              className="border rounded-[10px] p-3 w-full border-gray-400 bg-gray-200"
              value={user.email}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label>
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              className="border rounded-[10px] p-3 w-full border-gray-400 "
              value={user.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="col-span-2 flex flex-col my-5">
            <label>Order Notes</label>
            <textarea
              className="border rounded-[10px] p-3 w-full"
              rows={4}
              placeholder="Write your notes here..."
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingDetail;
