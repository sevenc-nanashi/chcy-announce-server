import { Hono } from 'hono';
import type { ServerInfo } from '@sonolus/core';

const app = new Hono();

app.use('/sonolus/*', (c, next) => {
	c.header('Cache-Control', 'max-age=3600, public');
	c.header('CDN-Cache-Control', 'max-age=3600, public');
	return next();
});

const texts = {
	en: `Chart Cyanvas has ended the service. For more information: https://cc.sevenc7c.com/`,
	ja: `Chart Cyanvasはサービスを終了しました。詳細については、 https://cc.sevenc7c.com/ をご覧ください。`,
};

app.get('/sonolus/info', (c) => {
	const localization = c.req.query('localization') || 'en';
	return c.json({
		buttons: [],
		configuration: {
			options: [],
		},
		title: 'Chart Cyanvas',
		banner: {
			hash: '4df0fedbcbc6e86a104561716e366b0cf48e7ba2',
			url: '/banner.png',
		},
		description: localization in texts ? texts[localization as keyof typeof texts] : texts.en,
	} satisfies ServerInfo);
});

app.get('/sonolus/*', (c) => {
	const localization = c.req.query('localization') || 'en';
	return c.json(
		{
			message: localization in texts ? texts[localization as keyof typeof texts] : texts.en,
		},
		410,
	);
});

export default app;
