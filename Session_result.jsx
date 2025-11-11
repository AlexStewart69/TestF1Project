import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router";

import { Driver } from "./Drivers";

export const Session_result = () => {
  const { session_key } = useParams();
  const query = useQuery({
    queryKey: ["Session_result"],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openf1.org/v1/session_result?session_key=${session_key}`
      );
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

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4"
            >
              About
            </a>
            <a
              href="Meetings.jsx"
              className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4"
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
      <footer className="fixed bottom-0 left-0 z-10 w-full p-4 bg-black border-t border-white-200 shadow-sm md:flex md:items-center md:justify-between md:p-3 dark:bg-black-800 dark:border-black-600">
        <span className="text-sm text-white sm:text-center dark:text-white">
          ©2025
          <a href="#" className="hover:underline">
            F1 Statistics
          </a>
          All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="Meetings.jsx" className="hover:underline me-4 md:me-6">
              Meetings
            </a>
          </li>

          <li>
            <a href="#" className="hover:underline">
              Back to top
            </a>
          </li>
        </ul>
      </footer>

      {query.data.map((session_result) => (
        <li
          key={`${session_result.session_key} ${session_result.position} ${session_result.dsq} ${session_result.dns}  ${session_result.dnf}  ${session_result.driver_number}`}
        >
          <div className="container grid grid-cols-7 gap-4 text-sm">
            <div className="mb-6 rounded border-2 p-4 shadow-xl/10 font-mono  text-purple-600  dark:text-sky-400">
              <p>Session Key:</p> {session_result.session_key}
            </div>

            <div className="rounded border-2 mb-6 font-sans text-black-600 ">
              <Driver
                session={session_result.session_key}
                number={session_result.driver_number}
              />
            </div>

            <div className="mb-6 rounded border-2  p-4 shadow-xl/10 font-mono  text-purple-600  dark:text-sky-400">
              <p>Driver Number:</p>

              {session_result.driver_number}
            </div>

            <div className="mb-6 rounded border-2  p-4 shadow-xl/10 font-sans  text-purple-600  dark:text-sky-400">
              <div className="wrap-anywhere">
                <p>
                  Length of Race in seconds/Fastest Practice or Qualy lap in
                  seconds:
                </p>

                {session_result.duration}
              </div>
            </div>

            <div className="mb-6 rounded border-2p-4 shadow-xl/10 font-mono  text-purple-600  dark:text-sky-400">
              <p>Final position:</p>
              {session_result.position}
              {session_result.dnf ? "dnf" : ""}
              {session_result.dns ? "dns" : ""}
              {session_result.dsq ? "dsq" : ""}
            </div>

            <div className="mb-6 rounded border-2 p-4 shadow-xl/10 font-mono  text-purple-600  dark:text-sky-400">
              <p>Laps:</p>
              {session_result.number_of_laps}
            </div>
            <div className="mb-6 rounded border-2 p-4 shadow-xl/10 font-mono  text-purple-600  dark:text-sky-400">
              <div className="wrap-anywhere">
                <p>Gap to Leader:in seconds unless lapped</p>
                {session_result.gap_to_leader}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
