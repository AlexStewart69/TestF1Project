import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

export const Meetings = () => {
  const query = useQuery({
    queryKey: ["Meetings"],
    queryFn: async () => {
      const response = await fetch("https://api.openf1.org/v1/meetings");
      return response.json();
    },
  });
  if (!query.data) {
    return <div>Loading</div>;
  }
  return (
    <ul className="list-disc">
      <nav className="flex items-center justify-between flex-wrap bg-black p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            F1 Statistics
          </span>
        </div>
        <div className="block lg:hidden"></div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="#responsive-header"
              class="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4"
            >
              About
            </a>
            <a
              href="Meetings.jsx"
              class="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4"
            >
              Meetings
            </a>
          </div>
        </div>
      </nav>

      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src="https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
        ></img>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0"></div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4"></dl>
          </div>
        </div>
      </div>

      <div className="container grid grid-cols-5 gap-4">
        <div className="mb-6 rounded border-2 border-slate-100 bg-slate-50 p-4 shadow-xl/10 ... font-mono ... text-green-600 text-2xl dark:text-sky-400">
          <h1>Meeting ID:</h1>
        </div>
        <div className="mb-6 rounded border-2 border-slate-100 bg-slate-50 p-4 shadow-xl/10 ... font-sans ... text-green-600 text-2xl dark:text-sky-400">
          <h1>Circuit Name:</h1>
        </div>
        <div className="mb-6 rounded border-2 border-slate-100 bg-slate-50 p-4 shadow-xl/10 ... font-sans ... text-yellow-600 text-2xl dark:text-sky-700">
          <h2>Country:</h2>
        </div>
        <div className="mb-6 rounded border-2 border-slate-100 bg-slate-50 p-4 shadow-xl/10 ... font-mono ... text-blue-600 text-2xl dark:text-sky-700">
          <h2>Date and Time:</h2>
        </div>

        <div className="mb-6 rounded border-2 border-slate-100 bg-slate-50 p-4 shadow-xl/10 ... font-sans ... text-orange-600 text-2xl dark:text-sky-800">
          <h2>Type of Meeting:</h2>
        </div>
      </div>
      <footer class="fixed bottom-0 left-0 z-10 w-full p-4 bg-black border-t border-white-200 shadow-sm md:flex md:items-center md:justify-between md:p-3 dark:bg-black-800 dark:border-black-600">
        <span class="text-sm text-white sm:text-center dark:text-white">
          ©2025
          <a href="#" class="hover:underline">
            F1 Statistics
          </a>
          All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0">
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="Meetings.jsx" class="hover:underline me-4 md:me-6">
              Meetings
            </a>
          </li>

          <li>
            <a href="#" class="hover:underline">
              Back to top
            </a>
          </li>
        </ul>
      </footer>

      {query.data.map((meeting) => (
        <li key={meeting.meeting_key}>
          <div className="container grid grid-cols-5 gap-4">
            <div className="mb-6 rounded border-2 border-slate-100 bg-slate-50 p-4 shadow-xl/10 ... font-mono ... text-green-600 text-2xl dark:text-sky-400">
              <Link to={`/sessions/${meeting.meeting_key}`}>
                {meeting.meeting_key}
              </Link>
            </div>
            <div className="mb-6 rounded border-2 border-slate-100 bg-slate-50 p-4 shadow-xl/10 ... font-mono ... text-green-600 text-2xl dark:text-sky-400">
              {meeting.circuit_short_name}
            </div>
            <div className="mb-6 rounded border-2 border-slate-100 bg-slate-50 p-4 shadow-xl/10 ... font-mono ... text-yellow-600 text-2xl dark:text-sky-700">
              {meeting.country_name}
            </div>
            <div className="mb-6 rounded border-2 border-slate-100 bg-slate-50 p-4 shadow-xl/10 ... font-mono ... text-blue-600 text-2xl dark:text-sky-700">
              {new Date(meeting.date_start).toLocaleString("en-GB")}
            </div>

            <div className="mb-6 rounded border-2 border-slate-100 bg-slate-50 p-4 shadow-xl/10 ... font-mono ... text-orange-600 text-2xl dark:text-sky-800">
              {meeting.meeting_name}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
