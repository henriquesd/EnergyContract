using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EnergyContractCrud.Domain.Models;
using EnergyContractCrud.Domain.Interfaces;

namespace EnergyContractCrud.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractsController : ControllerBase
    {
        private readonly IContractRepository _contractRepository;

        public ContractsController(IContractRepository contractRepository)
        {
            _contractRepository = contractRepository;
        }

        // GET: api/Contracts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contract>>> Get()
        {
            var contracts = await _contractRepository.GetContracts();

            if (contracts == null)
            {
                return NotFound();
            }
            return new ObjectResult(contracts);
        }

        // GET: api/Contracts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contract>> Get(int id)
        {
            var contract = await _contractRepository.GetContractById(id);

            if (contract == null)
            {
                return NotFound();
            }

            return contract;
        }

        // PUT: api/Contracts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Contract contract)
        {
            if (id != contract.Id)
            {
                return BadRequest();
            }

            try
            {
                await _contractRepository.Put(contract);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContractExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Contracts
        [HttpPost]
        public async Task<ActionResult<Contract>> Post(Contract contract)
        {
            await _contractRepository.Post(contract);

            return CreatedAtAction("Get", new { id = contract.Id }, contract);
        }

        // DELETE: api/Contracts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Contract>> Delete(int id)
        {
            var contract = await _contractRepository.GetContractById(id);
            if (contract == null)
            {
                return NotFound();
            }

            await _contractRepository.Delete(id);

            return Ok();
        }

        private bool ContractExists(int id)
        {
            return _contractRepository.ContractExists(id);
        }
    }
}
