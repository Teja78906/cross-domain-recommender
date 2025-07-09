from pp import recommend
from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app, resources={r"/get-results": {"origins": "http://localhost:3000"}})
# Function to get results based on book title
def get_results(book_title):
    # Your machine learning algorithm code to get results based on the book title
    # This is a placeholder function, replace it with your actual implementation
    pl=recommend(book_title)
    results = [{'name': song} for song in pl]
    # print(results)
    return results

@app.route('/get-results', methods=['POST'])
def fetch_results():
    data = request.json
    book_title = data.get('book_title')
    if book_title:
        results = get_results(book_title)
        # return results
        return jsonify(results)
    else:
        return jsonify({'error': 'Book title not provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
# print(get_results("Sharp Objects"))
