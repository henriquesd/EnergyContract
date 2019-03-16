using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnergyContractCrud.Domain.Models
{
    public class Contract
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName="nvarchar(100)")]
        public string ClientName { get; set; }

        [Required]
        public ContractTypeEnum Type { get; set; }

        public double Quantity { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public int Month { get; set; }

        [Required]
        public int Year { get; set; }

        public int DurationMonths { get; set; }

        [Column(TypeName = "varbinary(max)")]
        public byte[] PdfFile { get; set; }
    }
}
