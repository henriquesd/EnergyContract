using EnergyContractCrud.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EnergyContractCrud.Domain.Interfaces
{
    public interface IContractRepository
    {
        Task<IEnumerable<Contract>> GetContracts();
        Task<Contract> GetContractById(int id);
        Task Post(Contract contract);
        Task Put(Contract contract);
        Task Delete(int id);
        bool ContractExists(int id);
    }
}
