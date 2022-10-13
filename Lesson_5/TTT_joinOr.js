/*
create a function joinOr that accepts up to three arguments. an Array (will always be provided) with two strings (optional)

input:
Array:
- with element to be prompt at screen
string1(optional):
- should be included in string result 
should work as followed: 
string2(optional):
- should be included in string result 

rules:
if only the array is provided
  if  the array's length <= 2:
    return `arr.join(' or ')`
  Else if the array's length > 2;
    return arr.split(0, arr.length -1).join(', ') + ' or ' + arr[arr.length - 1]
else if string1 is provided

2 elements 
return string1 ? arr.join(string1) : arr.join(' or ');
more than 2 elements:
if string1 and string2 are included
  return arr.slice(0, arr.length -1).join(string1) + string2 + arr[arr.length - 1];
else return
  arr.slice(0, arr.length -1).join(string1) + string2 + arr[arr.length - 1];

END

test cases:
joinOr([1, 2]) // 1 or 2
joinOr([1, 2, 3]) // 1, 2, or 3
joinOr([1, 2, 3], '; ') // 1; 2; or 3
joinOr([1, 2, 3], ', ', 'and') // "1, 2, and 3"
*/


// obj is the context for `joinOr`; replace it with the correct context.

function joinOr(arr, str1, str2) {
  if (arr.length <= 2) {
    return str1 ? arr.join(str1) : arr.join(' or ');
  } else if (arr.length > 2) {
    if (str1 && str2) {
      return arr.slice(0, arr[arr.length - 2]).join(str1) + ` ${str2} ` + arr[arr.length - 1];
    } else if (str1 && !str2) {
      return arr.slice(0, arr[arr.length - 2]).join(str1) + ' or ' + arr[arr.length - 1];
    }
  }
}

let test = [1, 2, 3];

console.log(joinOr(test, ', '));