import React from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';

import useStyles from './styles.js';
import NewsCard from '../NewsCard/NewsCard';
const infoCards = [
    { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
    { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
    { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
  ];

const NewsCards = ({articles , activeArticle}) => {
    const classes = useStyles();

    if(!articles.length ){
        return(
            <Grow in>

            <Grid className ={classes.container}container alignItems="stretch" spacing = {3} >
                {infoCards.map((infoCards)=>(
                    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCards}>
                        <div className={classes.card} style={{backgroundColor: infoCards.color}}>
                            <Typography varient="h5">{infoCards.title}</Typography>
                            {infoCards.info ? (<Typography varient="h6">
                                <strong>
                                {infoCards.title.split(' ')[2]}:
                                </strong>
                                <br />
                                {infoCards.info}
                                </Typography>) : null}
                                <Typography varient = "h6">Try Saying <br /> <i> { infoCards.text }</i></Typography>
                        </div>
                      </Grid>  
                ))}
                </Grid> 
            </Grow>
        );
    }
    return (
        <Grow in>

            <Grid className ={classes.container}container alignItems="stretch" spacing = {3} >
            {articles.map((articles,i)=>(
                <Grid item xs ={12} sm ={6} md= {4} lg={3} style={{display:'flex'}}>
                    <NewsCard articles={articles} activeArticle={activeArticle} i={i}  />
                </Grid>
            ))}
            </Grid>
        </Grow>
    );
}

export default NewsCards;
