
let source = {};

let priority =  1,
let language= ['en'],
let domains = ['cmovieshd.net'],
let base_link = 'http://cmovieshd.net/',
let tv_link = 'https://cmovieshd.net/tv-series/',
let movie_link = 'https://cmovieshd.net/movie/',
let search_link = 'https://cmovieshd.net/search/?q='



let streamdor = async (html, src, olod) => {

  let episodeId = html.match(/.*streamdor.co/video/(\d+)/ig);

  if (!episodeId) return;

  parserEpisode = await client.request('https://embed.streamdor.co/video/' + episodeId[0], 'GET', {}, {'Referer': src});
  parserEpisode = parserEpisode.match(/JuicyCodes.Run\(([^\)]+)/i);
  parserEpisode = parserEpisode.replace(/\"\s*\+\s*\"/ig, '');
  parserEpisode = parserEpisode.replace(/[^A-Za-z0-9+\\/=]/i, '');
  parserEpisode = base64.decode(parserEpisode);
  parserEpisode = aes(parserEpisode);
  

  qual = parserEpisode.match(/label:"(.*?)"/i);

  if (qual) {qual = qual[0];}
  else {qual = 'SD';}

  let findEmbed = parserEpisode.match(/(https://streamango.com/embed/.*?)/i);


  if (findEmbed) {

    return detail = {
      'source': 'streamango.com', 'quality': qual, 'language': 'en', 'url': findEmbed[0], 
      'info': '', direct: false, 'debridonly': False
    };

  }

  if (olod) {
    return {
      'source': 'openload.co', 'quality': qual, 'language': 'en', 'url': findEmbed[0], 
      'info': '', direct: false, 'debridonly': False
    };
  }
  return false;

}

source.source = async (url) => {
  return;
};
source.movie = async (infoMovie, listDirect, getDirect, callback) => {
  try {

    let movieLink = '';
    let listLink = [];


    let searchLink = search_link + infoMovie.title + "+" +infoMovie.year;
    let parser = await client.request(searchLink, 'GET', {}, {}, false, '', '', '', 'dom');

    if (!parser) return;

    let listItem = parser('a.ml-mask');


    listItem.each(function() {

      let title = parser(this).attr('title');

      if (title.toLowerCase() == infoMovie.title.toLowerCase() || title.toLowerCase() == infoMovie.title.toLowerCase() + " " + infoMovie.year) {
        movieLink = parse(this).href;
        break;
      }
    });

    if (movieLink == '') return;

    parser = await client.request(movieLink+"watch", 'GET', {}, {}, false, '' ,'' ,'' ,'dom');

    if (!parser) return;

    let listEps = parser('.btn-eps');

    listEps.each(function() {
        listLinks.push(parser(this).href);
    });

    let arrPromise = listLinks.map(async (item) => {

      let parserEmbed = client.request(item, 'GET');

      if (parseEmbed.match(/http.+:\/\/openload\.co\/embed\/.+\"/ig)) {

        let openloadLink = parseEmbed.match(/http.+:\/\/openload.co\/embed\/.+\"/ig); 
        if (openloadLink) {

          let embed = await streamdor(trim(openloadLink[0]), item, true);
          if (embed) {

            getDirect(embed, listDirect, callback);
          }
        }
      } else {

        let embed = await streamdor(parserEmbed, item, false);

        if(embed) {

          getDirect(embed, listDirect, callback);
        }
        
      }
    });
    await Promise.all(arrPromise);

  } catch(e) {
    return;
  }
};
source.tvshow = async (infoMovie, listDirect, getDirect, callback) => {

  try {

    let tvshowLink = '';
    let episodeLink = [];

    let searchText = infoMovie.title + ' season ' + infoMovie.season;
    

    let parser = await client.request(search_link+searchText, 'GET', {}, {}, false, '', '', '', 'dom');
    let listItem = parser('.ml-item');

    listItem.each(function() {
      tvshowLink = parser(this).href;
      const title = parser(this).attr('title');

      if (href && title.toLowerCase().replace(/\W+/ig, '') == (infoMovie.title + " - season " + infoMovie.season).toLowerCase().replace(/\W+/ig, '')) {
        break;
      }
    });

    if (!tvshowLink) return;

    parser = client.request(tvshowLink+'watch', 'GET', {}, {}, false, '', '', '', 'dom');
    let listEps = parser('.btn-eps');

    listEps.each(function() {
      let eps = parser(this).text;
      eps = exps.match(/episode *([0-9]+)/i);

      if (eps && eps == infoMovie.episode)  {
        episodeLink.push(parser(this).href);
      }
    });

    let arrPromise = episodeLink.map(async (item) => {
      parserEmbed = client.request(item, 'GET'); 

      if (parseEmbed.match(/http.+:\/\/openload\.co\/embed\/.+\"/ig)) {

        let openloadLink = parseEmbed.match(/http.+:\/\/openload.co\/embed\/.+\"/ig); 
        if (openloadLink) {

          let embed = await streamdor(trim(openloadLink[0]), item, true);
          if (embed) {

            getDirect(embed, listDirect, callback);
          }
        }
      } else {

        let embed = await streamdor(parserEmbed, item, false);

        if(embed) {

          getDirect(embed, listDirect, callback);
        }
        
      }
    });

  } catch(e) {
    return;
  }
};


fhQa4JaHXqYgMdDQ = source;