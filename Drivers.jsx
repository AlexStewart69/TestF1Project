import { useQuery } from "@tanstack/react-query";

export const Driver = ({ session, number }) => {
  const query = useQuery({
    queryKey: ["Driver", session, number],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openf1.org/v1/drivers?driver_number=${number}&session_key=${session}`
      );
      if (response.status > 300) {
        throw new Error("failtofetch");
      }
      return response.json();
    },
    retryDelay: 1000,
  });
  if (!query.data) {
    return <div>Loading</div>;
  }
  if (query.data === undefined || query.data.length === 0) {
    return <div>no results</div>;
  }

  return (
    <div
      className="p-2 flex rounded-2xl"
      style={{ backgroundColor: `#${query.data.at(0).team_colour}` }}
    >
      <div className="h-40 self-center">
        <img src={query.data.at(0).headshot_url} />
      </div>
      <div className="text-sm m-2 ">
        <p>Driver Name:</p> {query.data.at(0).full_name}
        <p>Team Name:</p> {query.data.at(0).team_name}
        <p>Country:</p> {query.data.at(0).country_code}
        <p>Team Colour:</p>
        {query.data.at(0).team_colour}
      </div>
    </div>
  );
};
