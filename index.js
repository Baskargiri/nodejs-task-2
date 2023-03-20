// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
const app = express();
app.use(express.json()); //middle ware to add json to body
const PORT = 4000;

let room = [
  {
    id: 1,
    room_name: "LUX ROOM",
    no_Of_seat: "800",
    Price: "2500",
    amenities: ["wifi", "AC", "TV"],
    bookingStatus: "booked",
    CustomerDetails: {
      Name: "baskar",
      room_id: "1",
      data: "20.03.2023",
      StartTime: "5.00",
      EndTime: "10.00",
      status: "booked",
    },
  },
  {
    id: 2,
    room_name: "GRAND ROOM",
    no_Of_seat: "600",
    Price: "2000",
    amenities: ["wifi", "AC", "TV"],
    bookingStatus: "booked",
    CustomerDetails: {
      Name: "aswath",
      room_id: "2",
      data: "25.03.2023",
      StartTime: "16.00",
      EndTime: "23.00",
      status: "booked",
    },
  },
  {
    id: 3,
    room_name: "MID ROOM",
    no_Of_seat: "400",
    Price: "1500",
    amenities: ["wifi", "AC", "TV"],
    bookingStatus: "Available",
    CustomerDetails: {
      Name: "",
      room_id: "",
      data: "",
      StartTime: "",
      EndTime: "",
      status: "",
    },
  },
  {
    id: 4,
    room_name: "COMPACT ROOM",
    no_Of_seat: "150",
    Price: "750",
    amenities: ["wifi", "AC", "TV"],
    bookingStatus: "Available",
    CustomerDetails: {
      Name: "",
      room_id: "",
      data: "",
      StartTime: "",
      EndTime: "",
      status: "",
    },
  },
];

//to get all data
app.get("/", function (request, response) {
  response.send(room);
});

//create new room
app.post("/newroom", function (request, response) {
  let res = request.body;
  room.push(res);
  response.send({
    message: "room created sucessful",
  });
});

// room booking

app.post("/roombooking", function (request, response) {
  let booked = false;

  room.forEach((e) => {
    if (e.room_id == request.body.room_id) {
      booked = false;
    }
  });
  if (booked) {
    response.send({
      message: "room booked",
    });
  } else {
    response.send({ message: "room not available" });
  }
});
//booked room details

app.get("/bookingdetails", function (request, response) {
  let result = [];
  room.forEach((e) => {
    if (e.bookingStatus == "booked") {
      result.push({
        name: e.room_name,
        seats: e.no_Of_seat,
        amenities: e.amenities,
        bookingStatus: e.bookingStatus,
        customerName: e.CustomerDetails.Name,
        date: e.CustomerDetails.data,
        StartTime: e.CustomerDetails.StartTime,
        EndTime: e.CustomerDetails.EndTime,
      });
    }
  });
  response.send(result);
});

//customer details
app.get("/customerdetails", function (request, response) {
  let data = [];
  room.forEach((e) => {
    if (e.bookingStatus == "booked") {
      data.push(e.CustomerDetails);
    }
  });
  response.send(data);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
