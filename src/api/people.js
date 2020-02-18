import peopleJSON from './people.json';

// sort users alphabetically by first name
let allUsers = peopleJSON.sort((a, b) => {
    const nameA = a.first_name.toUpperCase();
    const nameB = b.first_name.toUpperCase();
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
});

// create keys for a user's full name and initials
// convert user logins array into date objects and sort in descending order
allUsers.forEach((user, i) => {
    user.full_name = `${user.first_name} ${user.last_name}`;
    user.initials = `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
    user.logins = user.logins.map(login => new Date(login.date)).sort((a, b) => b - a);
});


function filterUsersByName(keyword) {
    return allUsers.filter(user => user.full_name.toLowerCase().includes(keyword.toLowerCase()));
}

export { allUsers, filterUsersByName };
