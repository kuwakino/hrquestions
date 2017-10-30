using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Web;

namespace InterviewTestPagination.Models.Todo
{
    public abstract class RepositoryBase
    {
        public static IQueryable<T> GetPropertyQuery<T>(IQueryable<T> source, string propertyName, bool ascending)
        {
            var root = Expression.Parameter(typeof(T), "x");
            var member = propertyName.Split('.').Aggregate((Expression)root, Expression.PropertyOrField);
            var selector = Expression.Lambda(member, root);
            var method = ascending ? "OrderBy" : "OrderByDescending";
            var types = new[] { typeof(T), member.Type };
            var mce = Expression.Call(typeof(Queryable), method, types,
                source.Expression, Expression.Quote(selector));
            return source.Provider.CreateQuery<T>(mce);
        }

    }
}