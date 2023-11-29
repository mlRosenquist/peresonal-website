export const getMarkdown = async (path: string): Promise<string> => {
    return fetch(path)
        .then(data => data.text()); 
}