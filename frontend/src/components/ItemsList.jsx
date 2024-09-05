import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, createItem } from '../features/itemsSlice';

const ItemsList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const [newFriend, setNewFriend] = useState('');

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAddFriend = () => {
    if (newFriend.trim()) {
      dispatch(createItem({ friend: newFriend }));
      setNewFriend('');  // Clear input field
    }
  };

  return (
    <div>
      <h1>Friends List</h1>
      <input 
        type="text" 
        value={newFriend} 
        onChange={(e) => setNewFriend(e.target.value)} 
        placeholder="Enter friend's name" 
      />
      <button onClick={handleAddFriend}>Add Friend</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
