
const https = require('https');
https.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://nanodiesel.id/&strategy=mobile', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      const audits = result.lighthouseResult.audits;
      const metrics = result.lighthouseResult.categories.performance.score * 100;
      console.log('Mobile Performance Score:', metrics);
      console.log('LCP:', audits['largest-contentful-paint'].displayValue);
      console.log('FCP:', audits['first-contentful-paint'].displayValue);
      console.log('TBT:', audits['total-blocking-time'].displayValue);
      console.log('CLS:', audits['cumulative-layout-shift'].displayValue);
      
      console.log('\nOpportunities:');
      for (const key in audits) {
        const audit = audits[key];
        if (audit.details && audit.details.type === 'opportunity' && audit.score !== 1 && audit.score !== null) {
          console.log('- ' + audit.title + ' (Savings: ' + audit.details.overallSavingsMs + 'ms)');
        }
      }
    } catch(e) { console.error('Error parsing JSON'); }
  });
});

