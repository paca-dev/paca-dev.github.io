import { useState } from 'react';
import companiesData from '../data/companies.json'; 

interface Props {
  companyName: string;
}

const CompanyLogo = ({ companyName }: Props) => {
    const company = companiesData.filter(x => companyName.toLocaleLowerCase().includes(x.name.toLocaleLowerCase().split(" ")[0]))[0];
    const companyURL = company? company.website : ""    ;
    const [imgError, setImgError] = useState(false);

    function nameToColor(name: string): string {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
        }

        const r = (hash >> 16) & 0xff;
        const g = (hash >> 8) & 0xff;
        const b = hash & 0xff;

        const normalize = (val: number) => Math.abs(val % 256);
        const toHex = (n: number) => n.toString(16).padStart(2, '0');

        return `${toHex(normalize(r))}${toHex(normalize(g))}${toHex(normalize(b))}`;
    }

    // Normalize the URL to always have protocol
    let domain: string | null = null;
    if (companyURL) {
        try {
        const normalizedUrl = companyURL.startsWith('http')
            ? companyURL
            : `https://${companyURL}`;
        domain = new URL(normalizedUrl).hostname;
        } catch {
        domain = null; // fallback if parsing fails
        }
    }

    const faviconUrl = domain
        ? `https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`
        : null;

    const logoSrc =
        faviconUrl && !imgError
        ? faviconUrl
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
            companyName
            )}&background=${nameToColor(companyName)}&color=fff`;

    return (
        <img
            src={logoSrc}
            alt={companyName}
            onError={() => setImgError(true)}
            className="w-12 h-12 rounded-lg object-cover"
        />
    );
};

export default CompanyLogo;
