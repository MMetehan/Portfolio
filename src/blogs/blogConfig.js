// Auto-import all markdown files from posts directory
const postModules = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true });

// Function to parse frontmatter from markdown content
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return { metadata: {}, content: content };
    }

    const frontmatterText = match[1];
    const markdownContent = content.slice(match[0].length);

    // Simple YAML-like parser
    const metadata = {};
    const lines = frontmatterText.split('\n');

    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;

        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        // Remove quotes
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        // Handle arrays (tags)
        if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1).split(',').map(item =>
                item.trim().replace(/['"]/g, '')
            );
        }

        // Handle booleans
        if (value === 'true') value = true;
        if (value === 'false') value = false;

        // Handle numbers
        if (!isNaN(value) && value !== '') {
            const num = Number(value);
            if (Number.isInteger(num)) value = num;
        }

        metadata[key] = value;
    }

    return { metadata, content: markdownContent };
}

// Function to create slug from filename
function createSlug(filename) {
    return filename
        .replace('./posts/', '')
        .replace('.md', '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Function to create a blog post object from markdown file
function createBlogPostFromMarkdown(filename, content) {
    const { metadata, content: markdownContent } = parseFrontmatter(content);

    const slug = createSlug(filename);

    // Generate excerpt from content if not provided
    let excerpt = metadata.excerpt || metadata.description || '';
    if (!excerpt) {
        const textContent = markdownContent
            .replace(/#{1,6}\s+/g, '') // Remove headers
            .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
            .replace(/\*(.+?)\*/g, '$1') // Remove italic
            .replace(/`(.+?)`/g, '$1') // Remove code
            .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
            .trim();
        excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');
    }

    return {
        id: slug,
        slug,
        title: metadata.title || 'Untitled',
        titleTr: metadata.titleTr || metadata.title || 'Başlıksız',
        description: metadata.description || excerpt,
        descriptionTr: metadata.descriptionTr || metadata.description || excerpt,
        excerpt: metadata.excerpt || excerpt,
        excerptTr: metadata.excerptTr || metadata.excerpt || excerpt,
        content: markdownContent,
        date: metadata.date || new Date().toISOString().split('T')[0],
        category: metadata.category || 'General',
        categoryTr: metadata.categoryTr || metadata.category || 'Genel',
        tags: Array.isArray(metadata.tags) ? metadata.tags : (metadata.tags ? [metadata.tags] : []),
        tagsTr: Array.isArray(metadata.tagsTr) ? metadata.tagsTr : (metadata.tagsTr ? [metadata.tagsTr] : metadata.tags || []),
        featured: metadata.featured === true,
        author: metadata.author || 'Muhammed Metehan Yıldırım',
        published: metadata.published !== false,
        readTime: metadata.readTime || Math.ceil(markdownContent.split(' ').length / 200),
        image: metadata.image || null,
        seo: {
            title: metadata.title || 'Untitled',
            description: metadata.description || excerpt,
            keywords: Array.isArray(metadata.tags) ? metadata.tags.join(', ') : (metadata.tags || ''),
            ogImage: metadata.image || null
        }
    };
}

// Generate all blog posts
const allPosts = Object.entries(postModules).map(([filename, content]) => {
    return createBlogPostFromMarkdown(filename, content);
}).filter(post => post.published).sort((a, b) => new Date(b.date) - new Date(a.date));

// Debug: Log all generated posts
console.log('Auto-generated blog posts:');
console.table(allPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: post.date,
    featured: post.featured,
    readTime: post.readTime + ' min'
})));

// Export functions
export function getBlogPosts() {
    return allPosts;
}

export function getFeaturedPosts(language = 'en') {
    return allPosts.filter(post => post.featured);
}

export function getBlogPost(slug) {
    return allPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category) {
    return allPosts.filter(post =>
        post.category.toLowerCase() === category.toLowerCase() ||
        post.categoryTr.toLowerCase() === category.toLowerCase()
    );
}

export function getBlogPostsByTag(tag) {
    return allPosts.filter(post =>
        post.tags.some(t => t.toLowerCase() === tag.toLowerCase()) ||
        post.tagsTr.some(t => t.toLowerCase() === tag.toLowerCase())
    );
}

export function searchBlogPosts(query, language = 'en') {
    const searchQuery = query.toLowerCase();
    return allPosts.filter(post => {
        const title = language === 'tr' ? post.titleTr : post.title;
        const description = language === 'tr' ? post.descriptionTr : post.description;
        const content = post.content;
        const tags = language === 'tr' ? post.tagsTr : post.tags;

        return title.toLowerCase().includes(searchQuery) ||
            description.toLowerCase().includes(searchQuery) ||
            content.toLowerCase().includes(searchQuery) ||
            tags.some(tag => tag.toLowerCase().includes(searchQuery));
    });
}

export function getCategories() {
    const categories = new Set();
    allPosts.forEach(post => {
        categories.add(post.category);
        categories.add(post.categoryTr);
    });
    return Array.from(categories);
}

export function getTags() {
    const tags = new Set();
    allPosts.forEach(post => {
        post.tags.forEach(tag => tags.add(tag));
        post.tagsTr.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
}

// Legacy exports for backward compatibility
export const blogPosts = allPosts;
export const getAllCategories = getCategories;
export const getBlogPostBySlug = getBlogPost;

export default {
    getBlogPosts,
    getFeaturedPosts,
    getBlogPost,
    getBlogPostsByCategory,
    getBlogPostsByTag,
    searchBlogPosts,
    getCategories,
    getTags,
    blogPosts: allPosts,
    getAllCategories: getCategories,
    getBlogPostBySlug: getBlogPost
};
