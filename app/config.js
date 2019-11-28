const {
  appId,
  name: {
    humanReadableName,
    applicationName
  },
  bottomNavigationBar: {
    activeColor: navActiveColor,
    backgroundColor: navBackgroundColor,
    inactiveColor: navInactiveColor
  },
  colors: {
    backgroundColor: appBackgroundColor,
    primaryText,
    secondaryText
  },
  sections,
  social: {
    facebookUrl,
    instagramUrl,
    twitterUrl
  },
  stream,
  currentShowEndpoint,
  showsEndpoint,
  podcastsEndpoint,
  writeEmailTo
} = CUSTOMIZATION

const config = {
  'appId': appId || 'org.camba.radio',
  'jsondata': true,
  'colors': {
    'appBackgroundColor': {
      backgroundColor: appBackgroundColor || '#432f4f'
    },
    'bottomNavigationBar': {
      activeColor: navActiveColor || '#E500A2',
      backgroundColor: navBackgroundColor || '#1a121f',
      inactiveColor: navInactiveColor || '#808080'
    },
    'panelBackgroundColor': {
      backgroundColor: navBackgroundColor || '#1a121f'
    },
    'primaryText': {
      color: primaryText || '#E500A2'
    },
    'secondaryText': {
      color: secondaryText || '#ffffff'
    }
  },
  'phoneNumber': '',
  'name': {
    humanReadableName: humanReadableName || 'Radio',
    applicationName
  },
  'sections': sections || [
    'Live',
    'Schedule',
    'WriteUs',
    'Podcasts',
    'Social'
  ],
  'shareApp': {
    'playStoreUrl': `https://play.google.com/store/apps/details?id=${appId}`
  },
  'socialNetworks': [
    {
      link2App: 'com.facebook',
      link2Page: facebookUrl,
      iconId: '\ue028',
      iconColor: '#fafafa',
      background: '#365899'
    },
    {
      link2App: 'com.instagram',
      link2Page: instagramUrl,
      iconId: '\ue044',
      iconColor: '#fafafa',
      backgroundImage: '~/assets/images/instagram.png'
    },
    {
      link2App: 'com.twitter',
      link2Page: twitterUrl,
      iconId: '\ue08d',
      iconColor: '#fafafa',
      background: '#006dbf'
    }
  ],
  'stream': stream,
  'endpointUrls': {
    currentShow: currentShowEndpoint || '/api/programs/current',
    shows: showsEndpoint || '/api/programs',
    podcasts: podcastsEndpoint || '/api/podcasts'
  },
  'writeEmailTo': writeEmailTo || ['info@camba.coop']
}

export default config
