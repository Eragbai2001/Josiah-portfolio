/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://josiah-portfolio1.vercel.app',
  generateRobotsTxt: true, // (optional)
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://josiah-portfolio1.vercel.app/sitemap.xml',
    ],
  },
}