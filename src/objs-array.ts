enum Role {
  ADMIN, READ_ONLY, AUTHOR
}

const person: {
  name: string;
  age: number;
  // array of strings
  hobbies: string[];
  // tuple
  // role: [number, string];
  // enum
  role: Role
} = {
  name: 'Joanna',
  age: 32,
  hobbies: ['Sports', 'Cooking'],
  role: Role.AUTHOR
}

// 'push' isnt affected by typescript
// person.role.push('admin')
// person.role = [10, 'admin']
