using EnergyContractCrud.Domain.Interfaces;
using EnergyContractCrud.Domain.Models;
using EnergyContractCrud.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyContractCrud.Repositories
{
    public class ContractRepository : IContractRepository
    {
        private readonly ContractContext _context;

        public ContractRepository(ContractContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Contract>> GetContracts()
        {
            return await _context.Contracts.ToListAsync();
        }

        public async Task<Contract> GetContractById(int id)
        {
            var product = await _context.Contracts.SingleOrDefaultAsync(u => u.Id == id);

            return product;
        }

        public async Task Post(Contract contract)
        {
            _context.Add(contract);
            await _context.SaveChangesAsync();
        }

        public async Task Put(Contract contract)
        {
            _context.Entry(contract).State = EntityState.Modified;

            _context.Update(contract);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var contract = await _context.Contracts.FindAsync(id);
            if (contract != null)
            {
                _context.Remove(contract);
                await _context.SaveChangesAsync();
            }
        }

        public bool ContractExists(int id)
        {
            var contract = _context.Contracts.Find(id);

            return contract != null;
        }
    }

}
