import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'word-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import  NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

const alankey = '1d791641acae0b8ccbda439f2fd38afd2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] =useState(10) ;
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alankey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                  setNewsArticles(articles);
                  setActiveArticle(1);
                 } 
                 else if (command === 'highlight') {
                  setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === 'open') {
                  const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                  const article = articles[parsedNumber - 1];
        
                  if (parsedNumber > articles.length) {
                    alanBtn().playText('Please try that again...');
                  } else if (article) {
                    window.open(article.url, '_blank');
                    alanBtn().playText('Opening...');
                  } else {
                    alanBtn().playText('Please try that again...');
                  }
                }
              },
            });
          }, []);
        
          return (
            <div>
              <div className={classes.logoContainer}>
                {newsArticles.length ? (
                  <div className={classes.infoContainer}>
                    <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
                    <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
                  </div>
                ) : null}
                <img src="https://thumbs.dreamstime.com/b/microphone-news-vector-icon-blue-background-flat-image-long-shadow-layers-grouped-easy-editing-illustration-your-162261954.jpg" className={classes.Logo} alt="logo" />
              </div>
              <NewsCards articles={newsArticles} activeArticle={activeArticle} />
            </div>
          );
        };
        
        export default App;