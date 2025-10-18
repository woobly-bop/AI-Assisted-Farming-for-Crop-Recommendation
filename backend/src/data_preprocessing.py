from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

def build_crop_pipeline(numeric_features, categorical_features=[]):
    num_transformer = Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])
    cat_transformer = Pipeline([
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('onehot', OneHotEncoder(handle_unknown='ignore', sparse=False))
    ])
    preprocessor = ColumnTransformer([
        ('num', num_transformer, numeric_features),
        ('cat', cat_transformer, categorical_features)
    ], remainder='drop')
    return preprocessor

def build_yield_pipeline(numeric_features, categorical_features=[]):
    # For yield prediction, same preprocessing
    return build_crop_pipeline(numeric_features, categorical_features)
