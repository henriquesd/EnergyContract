using EnergyContractCrud.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace EnergyContractCrud.Infrastructure.Contexts
{
    public class ContractContext: DbContext
    {
        public ContractContext(DbContextOptions<ContractContext> options): base(options)
        {

        }

        public DbSet<Contract> Contracts { get; set; }
    }
}
