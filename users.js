const users = [];

let passwordMap = new Map();

const addUser = ({ id, name, room, email, password }) => {
  if (!name || !room) return {error:"Try again"};

  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (passwordMap.has(room)) {
    if (password != passwordMap.get(room)) {
      return { error: "Wrong Password!" };
    }
  } else {
    passwordMap.set(room, password);
  }

  const existingUser = users.find(
    (user) => user.email === email && user.room === room
  );
  const user = { id, name, email, room };
  if (existingUser) {
    // return { error: "Username is taken" };
  } else {
    users.push(user);
  }

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    let count = 0;
    users.map((user) => {
      if (user.room === users[index].room) {
        count++;
      }
    });

    if (count === 1) {
      passwordMap.delete(users[index].room);
    }

    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
