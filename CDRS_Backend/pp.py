import pickle
import numpy as np
import pandas as pd
import itertools

similarity = pickle.load(open('CDRS Project\\artifacts\\similarity.pkl','rb'))
new_book_df= pickle.load(open('CDRS Project\\artifacts\\book_df.pkl','rb'))
final_book= pickle.load(open('CDRS Project\\artifacts\\final_book.pkl','rb'))
tag_table_new_music = pickle.load(open('CDRS Project\\artifacts\\tag_table_new_music.pkl','rb'))
new_hot_encoded_music = pickle.load(open('CDRS Project\\artifacts\\new_hot_encoded_music.pkl','rb'))

def lower_case(tag_selected_book):
    list=[]
    for i in tag_selected_book:
        list.append(i.lower())
    return list  


def recommend(book_name):
    book_id=[]
    index = new_book_df[new_book_df['title'] == book_name].index[0]
    distances = sorted(list(enumerate(similarity[index])),reverse=True,key = lambda x: x[1])
    for i in distances[1:6]:
        book_id.append(new_book_df.iloc[i[0]].book_id)
    filtered_dataset = pd.DataFrame([ final_book[final_book.book_id == i].values[0] for i in book_id], columns = ['book_id', 'title','genre',"description"])
    selected_book_tags = filtered_dataset['genre']
    tag_selected_book = [ token for idx, token in enumerate(set(itertools.chain.from_iterable(selected_book_tags)))]
    tag_selected_book=lower_case(tag_selected_book)
    new_tag_selected_music = [tag_table_new_music[tag_table_new_music.relation == i].Tag.values for i in tag_selected_book]
    new_tag_selected_music = [ token for idx, token in enumerate(set(itertools.chain.from_iterable(new_tag_selected_music)))]
    recommended_new_music = []
    counts = np.zeros((new_hot_encoded_music.shape[0]))
    for i in new_tag_selected_music:
        indices = new_hot_encoded_music[new_hot_encoded_music[i] == 1.0].index.tolist()
        for j in indices:
            counts[j] += 1.0
    for i in range(40):
        max_idx = counts.argmax()
        recommended_new_music.append(max_idx)
        counts[max_idx] = 0
    recommended_new_music = new_hot_encoded_music.iloc[recommended_new_music].name.values
    recommended_new_music = np.array(recommended_new_music)
    recommended_new_music = recommended_new_music.ravel()
    return  recommended_new_music



# similarity = pickle.load(open('artifacts/similarity.pkl','rb'))
# new_book_df= pickle.load(open('artifacts/new_book_df.pkl','rb'))
# final_book= pickle.load(open('artifacts/final_book.pkl','rb'))
# tag_table_new_music = pickle.load(open('artifacts/tag_table_new_music.pkl','rb'))
# new_hot_encoded_music = pickle.load(open('artifacts/new_hot_encoded_music.pkl','rb'))



