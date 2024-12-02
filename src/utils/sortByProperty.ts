/**
 * Returns a sort function for an array of objects, sorting based on a string property present on all objects.
 * @param property - The property name to sort by.
 * @returns The sort function to use.
 */
export const sortByProperty = <T>(
  property: keyof T,
): ((a: T, b: T) => number) => {
  return (a: T, b: T) => {
    if (a[property] < b[property]) {
      return -1
    }
    if (a[property] > b[property]) {
      return 1
    }
    return 0
  }
}
