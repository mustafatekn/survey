using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using survey.data.Abstract;

namespace survey.data.Concrete
{
    public class EfCoreGenericRepository<TEntity> : IRepository<TEntity>
        where TEntity : class
    {
        protected readonly DbContext context;
        public EfCoreGenericRepository(DbContext ctx)
        {
            context = ctx;
        }

        public async Task<TEntity> Create(TEntity entity)
        {
            await context.Set<TEntity>().AddAsync(entity);
            return entity;
        }

        public void Delete(TEntity entity)
        {
            context.Set<TEntity>().Remove(entity);
        }

        public async Task<List<TEntity>> GetAll()
        {
            return await context.Set<TEntity>().ToListAsync();
        }

        public async Task<TEntity> GetById(int id)
        {
            return await context.Set<TEntity>().FindAsync(id);

        }

        public void  Update(TEntity entity)
        {
            context.Entry(entity).State = EntityState.Modified;
        }
    }
}