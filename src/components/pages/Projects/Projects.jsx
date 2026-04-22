import { useState } from 'react';
import { postsData } from '../../../data2'
import Post from '../../molecules/Post/Post';
import SearchBar from '../..//molecules/SearchBar/SearchBar';
import styles from './Projects.module.css';


function Feed() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('ALL');

    const filteredPosts = postsData.filter(post => {
        const matchesSearch =
            post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.title.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            activeCategory === 'ALL' || post.category === activeCategory;

        return matchesSearch && matchesCategory;
    });


    return (
        <div className={styles.layout}>

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
            <div className={styles.filters}>
                {['ALL', 'GAMES', 'FREELANCE', 'COMMISIONS', 'PERSONAL PROJECTS'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={activeCategory === cat ? styles.active : ''}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className={styles.feed}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => <Post key={post.id} {...post} />)


                ) : (
                    <div className={styles.nothinFound}>
                    <img></img>
                    <p className={styles.empty}>I haven't tried it yet</p>
                    </div>


                )}
            </div>
        </div>
    );
}
export default Feed;