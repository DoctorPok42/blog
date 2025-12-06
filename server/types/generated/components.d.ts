import type { Schema, Struct } from '@strapi/strapi';

export interface CollectionArticleList extends Struct.ComponentSchema {
  collectionName: 'components_collection_article_lists';
  info: {
    displayName: 'article-list';
  };
  attributes: {
    maxItemCol: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
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

export interface CollectionFeaturedArticle extends Struct.ComponentSchema {
  collectionName: 'components_collection_featured_articles';
  info: {
    displayName: 'featured-article';
  };
  attributes: {
    post: Schema.Attribute.Relation<'oneToOne', 'api::post.post'>;
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'collection.article-list': CollectionArticleList;
      'collection.featured-article': CollectionFeaturedArticle;
      'collection.search-bar': CollectionSearchBar;
    }
  }
}
