import type { Schema, Struct } from '@strapi/strapi';

export interface CollectionArticleList extends Struct.ComponentSchema {
  collectionName: 'components_collection_article_lists';
  info: {
    displayName: 'article-list';
  };
  attributes: {
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    type: Schema.Attribute.Enumeration<
      ['Line-by-line', 'Two-by-line', 'Grid']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Line-by-line'>;
  };
}

export interface CollectionCategoryList extends Struct.ComponentSchema {
  collectionName: 'components_collection_category_lists';
  info: {
    displayName: 'category-list';
  };
  attributes: {
    type: Schema.Attribute.Enumeration<['Grid', 'Line', 'Two-by-line']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Two-by-line'>;
  };
}

export interface CollectionFeaturedArticle extends Struct.ComponentSchema {
  collectionName: 'components_collection_featured_articles';
  info: {
    displayName: 'featured-article';
  };
  attributes: {
    post: Schema.Attribute.Relation<'oneToOne', 'api::post.post'>;
  };
}

export interface CollectionLatestArticles extends Struct.ComponentSchema {
  collectionName: 'components_collection_latest_articles';
  info: {
    displayName: 'latest-articles';
  };
  attributes: {
    number: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<6>;
    type: Schema.Attribute.Enumeration<['List', 'Grid']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Grid'>;
  };
}

export interface CollectionSearchBar extends Struct.ComponentSchema {
  collectionName: 'components_collection_search_bars';
  info: {
    displayName: 'search-bar';
  };
  attributes: {
    placeholder: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    textButton: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

export interface TextSimpleText extends Struct.ComponentSchema {
  collectionName: 'components_text_simple_texts';
  info: {
    displayName: 'simple-text';
  };
  attributes: {
    text: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'collection.article-list': CollectionArticleList;
      'collection.category-list': CollectionCategoryList;
      'collection.featured-article': CollectionFeaturedArticle;
      'collection.latest-articles': CollectionLatestArticles;
      'collection.search-bar': CollectionSearchBar;
      'text.simple-text': TextSimpleText;
    }
  }
}
