"use client";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import Preloader from "@/app/components/preloader";
import Logo from "@/app/components/Logo";

type WaitlistEntry = { id: string; firstName: string; lastName: string; phone: string; email: string; createdAt: any };

export default function AdminDashboard() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [sortNewestFirst, setSortNewestFirst] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }

    const q = query(collection(db, "paycortWaitlist"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as WaitlistEntry));
      setEntries(data);
      setLoading(false);
      setIsOnline(true);
    }, (error) => {
      console.error("Firebase error:", error);
      setIsOnline(false);
      setLoading(false);
    });

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      unsubscribe();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = entry.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || entry.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || entry.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterDate === "all") return matchesSearch;
    const entryDate = entry.createdAt?.toDate();
    const today = new Date();
    if (filterDate === "today") return entryDate?.toDateString() === today.toDateString() && matchesSearch;
    if (filterDate === "week") {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return entryDate >= weekAgo && matchesSearch;
    }
    return matchesSearch;
  });

  const sortedEntries = sortNewestFirst ? filteredEntries : [...filteredEntries].reverse();

  const exportToCSV = () => {
    const headers = ["First Name", "Last Name", "Email", "Phone", "Date Joined"];
    const rows = sortedEntries.map((entry) => [entry.firstName, entry.lastName, entry.email, entry.phone, entry.createdAt?.toDate().toLocaleDateString() || "N/A"]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `paycort-waitlist-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const todayCount = entries.filter((e) => e.createdAt?.toDate().toDateString() === new Date().toDateString()).length;
  const weekCount = entries.filter((e) => e.createdAt?.toDate() >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;

  if (loading) return <Preloader />;

  return (
    <div className="min-h-screen bg-[#EDFFF5]">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-green-100/30 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <div className="hidden sm:block"><p className="text-sm font-medium text-green-200">Admin Dashboard</p></div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border ${isOnline ? "bg-green-100/10 border-green-100/30" : "bg-red-100/10 border-red-100/30"}`}>
              <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-200 animate-pulse" : "bg-red-500"}`}></div>
              <span className={`text-xs font-medium ${isOnline ? "text-green-200" : "text-red-500"}`}>{isOnline ? "Live" : "Offline"}</span>
            </div>
            <button onClick={exportToCSV} className="px-4 py-2 bg-green-200 hover:bg-green-100 text-white rounded-lg font-medium transition-all duration-300 text-sm hover:shadow-lg">Export CSV</button>
            <button onClick={handleLogout} className="px-4 py-2 border-2 border-green-100 hover:bg-white text-gray-700 rounded-lg font-medium transition-all duration-300 text-sm hover:shadow-lg">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-[32px] md:text-[42px] font-bold text-black mb-2">Waitlist Overview</h1>
          <p className="text-gray-600">Monitor and manage your early access signups</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[{ label: "Total Signups", value: entries.length, bg: "bg-white" }, { label: "Today", value: todayCount, bg: "bg-[#C8E6D7]" }, { label: "This Week", value: weekCount, bg: "bg-white" }].map((stat, index) => (
            <div key={index} className={`${stat.bg} rounded-2xl p-6 border-2 border-green-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fadeInUp`} style={{ animationDelay: `${index * 0.1}s` }}>
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className="text-4xl font-bold text-green-200">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border-2 border-green-100 p-4 sm:p-6 mb-6 shadow-sm animate-fadeInUp stagger-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 px-4 py-3 bg-[#EDFFF5] border-2 border-green-100 rounded-lg focus:border-green-200 focus:outline-none transition-all duration-300 text-sm" />
            <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="px-4 py-3 bg-white border-2 border-green-100 rounded-lg focus:border-green-200 focus:outline-none transition-all duration-300 text-sm">
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
            </select>
            <button onClick={() => setSortNewestFirst(!sortNewestFirst)} className="px-4 py-3 border-2 border-green-100 rounded-lg hover:bg-[#EDFFF5] transition-all duration-300 text-sm font-medium whitespace-nowrap">
              {sortNewestFirst ? "Newest First" : "Oldest First"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEntries.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl border-2 border-green-100 p-12 text-center shadow-sm">
              <p className="text-gray-400 text-lg">No entries found</p>
            </div>
          ) : (
            sortedEntries.map((entry, index) => (
              <div key={entry.id} className="bg-white rounded-2xl border-2 border-green-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-scaleIn" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-200 to-green-100 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow">{entry.firstName[0]}{entry.lastName[0]}</div>
                    <div>
                      <p className="font-bold text-black group-hover:text-green-200 transition-colors">{entry.firstName} {entry.lastName}</p>
                      <p className="text-xs text-gray-500">#{index + 1}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm bg-[#EDFFF5] rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-700 font-medium truncate">{entry.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Phone:</span>
                    <span className="text-gray-700 font-medium">{entry.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-green-100">
                    <span className="text-gray-500">Joined:</span>
                    <span className="text-gray-700 text-xs">{entry.createdAt?.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }) || "N/A"}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 text-center text-gray-600 text-sm">Showing {sortedEntries.length} of {entries.length} entries</div>
      </div>
    </div>
  );
}