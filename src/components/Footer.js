import React from 'react';

import LogoFooter from 'url:../img/logo-footer.svg';
import SatoriFooter from 'url:../img/satori-footer.svg';

import './Footer.scss';

export const Footer = () => {
	return (
		<section className="footer">
			<img src={LogoFooter} />
			<span>By</span>
			<img src={SatoriFooter} />
		</section>
	);
};