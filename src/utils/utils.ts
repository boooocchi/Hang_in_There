export const dateFormatter = (date: Date) => {
  const formattedDate = date
    .toLocaleDateString('default', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-');
  return formattedDate;
};

export const getNavItemColor = (pathname: string, url: string) => {
  if (pathname === '/') return url === pathname ? 'text-lighterOrange' : '';
  return url.toLowerCase().includes(pathname) ? 'text-lighterOrange' : '';
};
