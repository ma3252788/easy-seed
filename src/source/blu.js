import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import { formatTorrentTitle, getInfoFromMediaInfo, getInfoFromBDInfo, getSize, getSourceFromTitle, getFilterBBCode, getBDInfoFromBBCode, getTagsFromSubtitle, getPreciseCategory } from '../common';

export default () => {
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  const { Category, Name, Type, Size, Resolution } = getBasicInfo();

  TORRENT_INFO.size = getSize(Size);
  TORRENT_INFO.title = formatTorrentTitle(Name);
  const tags = getTagsFromSubtitle(TORRENT_INFO.title);
  const IMDBYear = $('.movie-heading span:last').text();
  const movieName = $('.movie-heading span:first').text();
  if (!IMDBYear) {
    const matchYear = TORRENT_INFO.title.match(/(19|20)\d{2}/g);
    TORRENT_INFO.year = matchYear?.pop() ?? '';
  } else {
    TORRENT_INFO.year = IMDBYear.replace(/\(|\)|\s/g, '');
  }
  TORRENT_INFO.resolution = Resolution;
  const descriptionDom = $('.panel-heading:contains(Description)+div .panel-body');
  const descriptionBBCode = getFilterBBCode(descriptionDom[0]);
  TORRENT_INFO.description = descriptionBBCode;
  const imdbUrl = $('.movie-details a:contains(IMDB)').attr('href');
  TORRENT_INFO.imdbUrl = imdbUrl;
  TORRENT_INFO.movieName = movieName;
  const category = getCategory(Category);
  TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
  TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
  TORRENT_INFO.videoType = getVideoType(Type, Resolution);
  const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
  const mediaInfo = $('.decoda-code code').text();
  const bdinfo = getBDInfoFromBBCode(descriptionBBCode);
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
  const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
  TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
  TORRENT_INFO.videoCodec = videoCodec;
  TORRENT_INFO.audioCodec = audioCodec;
  TORRENT_INFO.tags = { ...tags, ...mediaTags };
  TORRENT_INFO.screenshots = TORRENT_INFO.description.match(/\[url=.+?\]\[img\].+?\[\/img\]\[\/url]/g) ?? [];
  return TORRENT_INFO;
};
const getBasicInfo = () => {
  const basicInfo = {};
  $('#vue+.panel table tr').each((index, element) => {
    const key = $(element).find('td:first').text().replace(/\s|\n/g, '');
    const value = $(element).find('td:last').text();
    basicInfo[key] = value.replace(/\n/g, '').trim();
  });
  return basicInfo;
};
const getCategory = (key) => {
  const catMap = {
    Movie: 'movie',
    'TV Show': 'tv',
  };
  return catMap[key];
};
const getVideoType = (type, resolution) => {
  type = type.replace(/\s/g, '');
  if (type.match(/FullDisc/)) {
    if (resolution.match(/2160p/i)) {
      return 'uhdbluray';
    } else if (resolution.match(/1080/)) {
      return 'bluray';
    } else {
      return 'dvd';
    }
  } else if (type.match(/Encode/i)) {
    return 'encode';
  } else if (type.match(/web/i)) {
    return 'web';
  } else if (type.match(/HDTV/i)) {
    return 'hdtv';
  }
  return type;
};
