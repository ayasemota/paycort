"use client";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import Preloader from "../components/preloader";
import Logo from "../components/Logo";
import Image from "next/image";

type WaitlistEntry = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: any;
};

export default function AdminDashboard() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [sortNewestFirst, setSortNewestFirst] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  useEffect(() => {
    const q = query(
      collection(db, "paycortWaitlist"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as WaitlistEntry)
      );
      setEntries(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterDate === "all") return matchesSearch;
    const entryDate = entry.createdAt?.toDate();
    const today = new Date();
    if (filterDate === "today")
      return (
        entryDate?.toDateString() === today.toDateString() && matchesSearch
      );
    if (filterDate === "week") {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return entryDate >= weekAgo && matchesSearch;
    }
    return matchesSearch;
  });

  const sortedEntries = sortNewestFirst
    ? filteredEntries
    : [...filteredEntries].reverse();

  const exportToCSV = () => {
    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Date Joined",
    ];
    const rows = sortedEntries.map((entry) => [
      entry.firstName,
      entry.lastName,
      entry.email,
      entry.phone,
      entry.createdAt?.toDate().toLocaleDateString() || "N/A",
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `paycort-waitlist-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
  };

  const todayCount = entries.filter(
    (e) => e.createdAt?.toDate().toDateString() === new Date().toDateString()
  ).length;
  const weekCount = entries.filter(
    (e) =>
      e.createdAt?.toDate() >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  if (loading) return <Preloader />;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={40}
                height={40}
              />
              <p className="font-bold text-2xl text-white">PAYCORT</p>
            </div>
            <div>
              <p className="text-sm font-medium text-green-200">
                Admin Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Live</span>
            </div>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-200 hover:bg-green-100 rounded-lg font-medium transition-all duration-300 text-sm"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Total Signups</span>
              <span className="text-2xl">👥</span>
            </div>
            <p className="text-4xl font-bold">{entries.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Today</span>
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-4xl font-bold text-green-400">{todayCount}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">This Week</span>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-4xl font-bold text-blue-400">{weekCount}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:bg-white/20 focus:border-green-400 focus:outline-none transition-all duration-300 placeholder-gray-400"
            />
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:bg-white/20 focus:border-green-400 focus:outline-none transition-all duration-300"
            >
              <option value="all" className="bg-gray-900">
                All Time
              </option>
              <option value="today" className="bg-gray-900">
                Today
              </option>
              <option value="week" className="bg-gray-900">
                This Week
              </option>
            </select>
            <button
              onClick={() => setSortNewestFirst(!sortNewestFirst)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 whitespace-nowrap"
            >
              {sortNewestFirst ? "↓ Newest" : "↑ Oldest"}
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("table")}
                className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                  viewMode === "table"
                    ? "bg-green-200 text-white"
                    : "bg-white/10 border border-white/20 hover:bg-white/20"
                }`}
              >
                📋
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-green-200 text-white"
                    : "bg-white/10 border border-white/20 hover:bg-white/20"
                }`}
              >
                ▦
              </button>
            </div>
          </div>
        </div>

        {viewMode === "table" ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    {["#", "Name", "Email", "Phone", "Date"].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-300"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {sortedEntries.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-gray-400"
                      >
                        <p className="text-lg">No entries found</p>
                      </td>
                    </tr>
                  ) : (
                    sortedEntries.map((entry, index) => (
                      <tr
                        key={entry.id}
                        className="hover:bg-white/5 transition-all duration-200"
                      >
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <p className="font-medium">
                              {entry.firstName} {entry.lastName}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {entry.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {entry.phone}
                        </td>
                        <td className="text-sm w-full pr-2 text-gray-400">
                          {entry.createdAt
                            ?.toDate()
                            .toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }) || "N/A"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedEntries.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-12">
                No entries found
              </div>
            ) : (
              sortedEntries.map((entry, index) => (
                <div
                  key={entry.id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-200 to-green-100 flex items-center justify-center text-white font-bold">
                      {entry.firstName[0]}
                      {entry.lastName[0]}
                    </div>
                    <div>
                      <p className="font-bold">
                        {entry.firstName} {entry.lastName}
                      </p>
                      <p className="text-xs text-gray-400">#{index + 1}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-300">📧 {entry.email}</p>
                    <p className="text-gray-300">📱 {entry.phone}</p>
                    <p className="text-gray-400 text-xs">
                      🕐{" "}
                      {entry.createdAt?.toDate().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }) || "N/A"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className="mt-6 text-center text-gray-400 text-sm">
          Showing {sortedEntries.length} of {entries.length} entries
        </div>
      </div>
    </div>
  );
}
