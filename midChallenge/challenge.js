function extractInitials(names) {
    return names.map(name => {
      const nameParts = name.split(' ');
      return nameParts.map(part => part[0]).join('');
    });
  }
  
  const fullNames = ['John Doe', 'Alice Johnson', 'Bob Smith'];
  const initialsArray = extractInitials(fullNames);
  console.log(initialsArray); // Output: ['JD', 'AJ', 'BS']
  

function filterByProperty(objects, propertyName, propertyValue) {
  return objects.filter(object => object[propertyName]=== propertyValue)
}

const people = [
  { name: 'Alice', age: 30, country: 'USA' },
  { name: 'Bob', age: 25, country: 'Canada' },
  { name: 'Charlie', age: 35, country: 'USA' },
  { name: 'David', age: 28, country: 'Australia' },
];

const filteredByCountry = filterByProperty(people, 'country', 'USA');
console.log(filteredByCountry);