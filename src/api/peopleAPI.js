import peopleJSON from './people.json';

let data = peopleJSON.sort(function (a, b) {
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

data.forEach((user, i) => {
    data[i].full_name = `${user.first_name} ${user.last_name}`;
    data[i].initials = `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
});


export default data;
