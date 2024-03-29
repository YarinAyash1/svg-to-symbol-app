export const getSampleSVG = (): string => {
    return '<svg viewBox="0 0 128 125" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M63.994.152C28.66.152 0 28.806 0 64.158c0 28.272 18.336 52.26 43.768 60.726 3.2.586 4.37-1.392 4.37-3.084 0-1.52-.06-5.544-.092-10.888-17.8 3.87-21.56-8.576-21.56-8.576-2.906-7.394-7.102-9.364-7.102-9.364-5.812-3.972.44-3.888.44-3.888 6.424.452 9.8 6.592 9.8 6.592 5.712 9.784 14.984 6.96 18.63 5.32.58-4.14 2.234-6.96 4.06-8.56-14.21-1.612-29.15-7.104-29.15-31.63 0-6.984 2.494-12.7 6.588-17.172-.66-1.62-2.856-8.12.628-16.932 0 0 5.374-1.72 17.6 6.56 5.104-1.42 10.58-2.128 16.02-2.152 5.44.024 10.914.734 16.024 2.154 12.22-8.28 17.58-6.56 17.58-6.56 3.496 8.81 1.3 15.316.64 16.936 4.104 4.476 6.58 10.19 6.58 17.174 0 24.586-14.966 30-29.22 31.58 2.296 1.98 4.34 5.88 4.34 11.854 0 8.556-.076 15.46-.076 17.56 0 1.706 1.154 3.7 4.4 3.074C109.68 116.396 128 92.42 128 64.156 128 28.808 99.344.152 63.994.152z"/></svg>';
}

export const getSampleSymbol = (): string => {
    return '<symbol viewBox="0 0 128 125" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" id="svg-sample" xmlns="http://www.w3.org/2000/svg"> <path d="M63.994.152C28.66.152 0 28.806 0 64.158c0 28.272 18.336 52.26 43.768 60.726 3.2.586 4.37-1.392 4.37-3.084 0-1.52-.06-5.544-.092-10.888-17.8 3.87-21.56-8.576-21.56-8.576-2.906-7.394-7.102-9.364-7.102-9.364-5.812-3.972.44-3.888.44-3.888 6.424.452 9.8 6.592 9.8 6.592 5.712 9.784 14.984 6.96 18.63 5.32.58-4.14 2.234-6.96 4.06-8.56-14.21-1.612-29.15-7.104-29.15-31.63 0-6.984 2.494-12.7 6.588-17.172-.66-1.62-2.856-8.12.628-16.932 0 0 5.374-1.72 17.6 6.56 5.104-1.42 10.58-2.128 16.02-2.152 5.44.024 10.914.734 16.024 2.154 12.22-8.28 17.58-6.56 17.58-6.56 3.496 8.81 1.3 15.316.64 16.936 4.104 4.476 6.58 10.19 6.58 17.174 0 24.586-14.966 30-29.22 31.58 2.296 1.98 4.34 5.88 4.34 11.854 0 8.556-.076 15.46-.076 17.56 0 1.706 1.154 3.7 4.4 3.074C109.68 116.396 128 92.42 128 64.156 128 28.808 99.344.152 63.994.152z"/> </symbol>';
}
export const getUuid = (): string => {
    return 'svg-xxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0;
        let v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const buildHtml = (rawSymbolCode: string, uuid: string) => {
    let symbol = rawSymbolCode
        .replace(/<title>.*<\/title>\s/, '');

    const icon = `
    <svg class="${uuid}">
        <use xlink:href="#${uuid}" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
    </svg>`;


    let symbolCode = symbol.split('\n');
    symbolCode.shift();
    symbolCode.pop();

    return {
        symbol,
        icon,
        symbolExample: symbolCode.join('\n')
    };
}

export const getItemDate = (date: number): string => {
    const currentDate = new Date(date);
    const dateString: string = currentDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });
    const timeString: string = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return `${dateString} ${timeString}`;
}

export function validateAndFixSvg(svgString: string): string {
    // Add xmlns attribute if it doesn't exist
    if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
        svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    // Add height and width attributes using values from viewBox
    const viewBoxMatch = svgString.match(/viewBox="([^"]+)"/);
    if (viewBoxMatch) {
        const viewBoxValues = viewBoxMatch[1].split(' ');
        const width = viewBoxValues[2];
        const height = viewBoxValues[3];
        svgString = svgString.replace('<svg', `<svg width="${width}" height="${height}"`);
    }

    return svgString;
}
