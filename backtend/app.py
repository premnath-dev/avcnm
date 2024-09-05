from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory array to store items
items = []

# GET route to retrieve all items
@app.route('/api', methods=['GET'])
def get_items():
    return jsonify({'items': items})

# POST route to create a new item
@app.route('/api', methods=['POST'])
def create_item():
    data = request.get_json()
    item = {
        'id': len(items) + 1,  # Generate a simple ID
        'name': data.get('friend', 'Unnamed item')
    }
    items.append(item)
    return jsonify({'message': 'Item created!', 'item': item}), 201

# PATCH route to update an item by id
@app.route('/api/<int:item_id>', methods=['PATCH'])
def update_item(item_id):
    data = request.get_json()
    for item in items:
        if item['id'] == item_id:
            item['name'] = data.get('name', item['name'])
            return jsonify({'message': f'Item {item_id} updated!', 'item': item})
    return jsonify({'error': 'Item not found!'}), 404

# DELETE route to delete an item by id
@app.route('/api/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    global items
    items = [item for item in items if item['id'] != item_id]
    return jsonify({'message': f'Item {item_id} deleted!'})

if __name__ == '__main__':
    app.run(debug=True)
