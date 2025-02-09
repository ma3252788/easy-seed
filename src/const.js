import { PT_SITE } from './config.yaml';
const TORRENT_INFO = {
  title: '', // 标题
  subtitle: '', // 副标题
  description: '', // 描述
  year: '', // 电影年份
  category: '', // 电影、电视、音乐等
  videoType: '', // bluray remux encodes web-dl
  source: '', // 视频来源
  videoCodec: '', // 视频编码
  audioCodec: '', // 音频编码
  resolution: '', // 分辨率
  area: '', // 地区
  doubanUrl: '', // 豆瓣地址
  doubanInfo: '', // 豆瓣简介
  imdbUrl: '', // imdb地址
  tags: {
    DIY: false,
    chineseAudio: false,
    cantoneseAudio: false,
    chineseSubtitle: false,
    atoms: false,
    dtsx: false,
    HDR: false,
    DolbyVision: false,
  }, // 标签 diy 中字 国配等
  mediaInfo: '', // mediainfo或者bdInfo
  screenshots: [],
  comparisonImgs: [], // 对比图
  movieAkaName: '', // 别名一般为电影英文名称
  movieName: '', // imdb电影原始名称 一般为拼音
  sourceSite: '', // 种子来源站点简称
  sourceSiteType: '', // 种子来源站点类型
  size: '', // 种子大小 转换成 Bytes
};
// 快速检索
const SEARCH_SITE_MAP = {
  HDB: 'https://hdbits.org/browse.php?search={imdbid}&sort=size&h=8&d=DESC',
  PTP: 'https://passthepopcorn.me/torrents.php?action=advanced&searchstr={imdbid}',
  MTeam: 'https://kp.m-team.cc/torrents.php?incldead=0&spstate=0&inclbookmarked=0&search={imdbid}&search_area={searchArea}&search_mode=0',
  TTG: 'https://totheglory.im/browse.php?search_field={imdbid}&c=M&sort=5&type=desc',
  CHD: 'https://chdbits.co/torrents.php?incldead=0&spstate=0&inclbookmarked=0&search={imdbid}&search_area=4&search_mode=0',
  BHD: 'https://beyond-hd.me/torrents/all?doSearch=Search&imdb={imdbid}&sorting=size&direction=desc',
  BLU: 'https://blutopia.xyz/torrents?imdb={imdbid}',
  SSD: 'https://springsunday.net/torrents.php?incldead=0&spstate=0&inclbookmarked=0&search={imdbid}&search_area={searchArea}&search_mode=0',
  HDT: 'https://hd-torrents.org/torrents.php?search={imdbid}&active=0&options=2&order=size&by=DESC',
  KG: 'https://karagarga.in/browse.php?search={imdbid}&search_type=imdb',
  FL: 'https://filelist.io/browse.php?search={imdbid}&cat=0&searchin=3&sort=3',
  'nzb.in': 'https://nzbs.in/search/{imdbid}?t=-1&ob=size_desc',
  Bdc: 'https://broadcity.in/browse.php?imdb={imdbid}',
};

const DOUBAN_SEARCH_API = 'https://omit.mkrobot.org/movie/infos';
const PT_GEN_API = 'https://media.pttool.workers.dev';
const TMDB_API_URL = 'https://api.themoviedb.org';
const TMDB_API_KEY = '3d62cb1443c6b34b61262ab332aaf78c';

const getSiteName = (host) => {
  let siteName = '';
  try {
    Object.keys(PT_SITE).forEach(key => {
      const hostName = PT_SITE[key].host;
      const matchReg = new RegExp(hostName, 'i');
      if (hostName && host.match(matchReg)) {
        siteName = key;
      }
    });
    return siteName;
  } catch (error) {
    if (error.message !== 'end loop') {
      console.log(error);
    }
  }
};

const CODES_ARRAY = ['atmos', 'dtshdma', 'aac', 'ac3', 'dd+', 'dd', 'dtsx', 'dts', 'truehd', 'flac', 'lpcm'];
const EUROPE_LIST = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'UK', 'Vatican City'];
const CURRENT_SITE_NAME = getSiteName(location.host);
const CURRENT_SITE_INFO = PT_SITE[CURRENT_SITE_NAME];
const HDB_TEAM = ['Chotab', 'CRiSC', 'CtrlHD', 'DON', 'EA', 'EbP', 'Geek', 'LolHD', 'NTb', 'RightSiZE', 'SA89', 'SbR', 'TayTo', 'VietHD'];
export {
  TORRENT_INFO,
  DOUBAN_SEARCH_API,
  PT_GEN_API,
  CODES_ARRAY,
  CURRENT_SITE_NAME,
  CURRENT_SITE_INFO,
  SEARCH_SITE_MAP,
  PT_SITE,
  EUROPE_LIST,
  TMDB_API_URL,
  TMDB_API_KEY,
  HDB_TEAM,
}
;
