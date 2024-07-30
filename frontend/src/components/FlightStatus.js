// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography } from '@mui/material';

// const FlightStatus = () => {
//   const [flights, setFlights] = useState([]);
//   const fetchFlights = async () => {
//     const { data } = await axios.get('http://localhost:8000/api/flights');
//     console.log(data,"sghj")
//     setFlights(data);
//   };
//   useEffect(() => {
//     fetchFlights();
//   }, []);

//   return (
//     <div className="container mx-auto px-4">
//       <h2 className="text-2xl font-bold mb-4">Flight Status</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {flights.map(flight => (
//           <Card key={flight._id} className="mb-4">
//             <CardContent>
//               <Typography variant="h5" component="div">
//                 {flight.flightNumber}
//               </Typography>
//               <Typography color="text.secondary">
//                 Status: {flight.status}
//               </Typography>
//               <Typography color="text.secondary">
//                 Gate: {flight.gate}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FlightStatus;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

const FlightStatus = () => {
  const [flights, setFlights] = useState([]);

  const fetchFlights = async () => {
    const { data } = await axios.get('http://localhost:8000/api/flights');
    setFlights(data);
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Flight Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flights.map(flight => (
          <Card key={flight._id} className="mb-4">
            <CardContent>
              <Typography variant="h5" component="div">
                Flight ID: {flight.flight_id}
              </Typography>
              <Typography color="text.secondary">
                Airline: {flight.airline}
              </Typography>
              <Typography color="text.secondary">
                Status: {flight.status}
              </Typography>
              <Typography color="text.secondary">
                Departure Gate: {flight.departure_gate}
              </Typography>
              <Typography color="text.secondary">
                Arrival Gate: {flight.arrival_gate}
              </Typography>
              <Typography color="text.secondary">
                Scheduled Departure: {new Date(flight.scheduled_departure).toLocaleString()}
              </Typography>
              <Typography color="text.secondary">
                Scheduled Arrival: {new Date(flight.scheduled_arrival).toLocaleString()}
              </Typography>
              <Typography color="text.secondary">
                Actual Departure: {flight.actual_departure ? new Date(flight.actual_departure).toLocaleString() : 'N/A'}
              </Typography>
              <Typography color="text.secondary">
                Actual Arrival: {flight.actual_arrival ? new Date(flight.actual_arrival).toLocaleString() : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlightStatus;
